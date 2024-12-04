import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Prisma from "@prisma/client";
import multer from "multer";
import path from "path";

import auth from "./auth/auth.controller.js";
import { error } from "console";

const prisma = new Prisma.PrismaClient();
dotenv.config();
const webPort = process.env.WEB_PORT || 8000;
const router = express.Router();
const app = express();
import createHttpError from "http-errors";

app.use(express.static("public"));
app.use(
  cors({
    // origin: ["http://localhost:3000"],
  })
);
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router.use("/auth", auth));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

let loginId;

app.post("/userregisone", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    res.json({
      message: "Input Null",
    });
  } else {
    const findUser = await prisma.userAuth.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      res.json({
        message: "Email Founded",
      });
    } else {
      if (password !== confirmPassword) {
        res.json({
          message: "Password Not Collect",
        });
      } else {
        res.json({
          message: "Success",
        });
      }
    }
  }
});

app.post(
  "/usersignup",
  upload.fields([
    { name: "profImg", maxCount: 1 },
    { name: "idCardImg", maxCount: 1 },
    { name: "resumeImg", maxCoun: 1 },
  ]),
  async (req, res) => {
    try {
      const { email, password, firstName, lastName, nickName, sex, phone, idLine, birthDate } = req.body;
      const { profImg, idCardImg, resumeImg } = req.files;
      if (
        !firstName ||
        !lastName ||
        !nickName ||
        !birthDate ||
        !sex ||
        !phone ||
        !idLine ||
        !profImg[0].filename ||
        !idCardImg[0].filename ||
        !resumeImg[0].filename
      ) {
        res.status(401).json({
          message: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        const createUser = await prisma.userAuth.create({
          data: {
            email: email,
            password: password,
            role: "USER",
          },
        });
        loginId = createUser.loginId;

        await prisma.jobber.create({
          data: {
            userId: createUser.loginId,
            firstName: firstName,
            lastName: lastName,
            nickName: nickName,
            sex: sex,
            phone: phone,
            lineId: idLine,
            image: profImg[0].filename,
            idCard: idCardImg[0].filename,
            portfolio: resumeImg[0].filename,
            birthday: birthDate,
          },
        });

        res.json({
          message: "Signup Successs",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

app.post("/comregisone", async (req, res) => {
  const { compName, busType, contName, contPhone, email, password, confirmPassword } = req.body;
  if (!compName || !busType || !contName || !contPhone || !email || !password || !confirmPassword) {
    res.json({
      message: "Input Null",
    });
  } else {
    const findUser = await prisma.userAuth.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      res.json({
        message: "Email Founded",
      });
    } else {
      if (password !== confirmPassword) {
        res.json({
          message: "Password Not Collect",
        });
      } else {
        res.json({
          message: "Success",
        });
      }
    }
  }
});

app.post("/company/addbranch", async (req, res) => {
  // console.log(req.data);
  const { name, email, phone, address, province, district, subDistrict, postCode } = req.body;
  const userId = parseInt(req.body.userId);
  if (!name || !email || !phone || !address || !province || !district || !subDistrict || !postCode) {
    res.json({ message: "ใส่ข้อมูลไม่ครบ" });
  } else {
    const createLocation = await prisma.location.create({
      data: {
        address: address,
        province: province,
        district: district,
        subDistrict: subDistrict,
        postCode: postCode,
      },
    });
    const createBranch = await prisma.branch.create({
      data: {
        name: name,
        phone: phone,
        email: email,
        locationId: createLocation.id,
        companyId: userId,
      },
    });
    res.json({ message: "สร้างสำเร็จ" });
  }
});

app.get("/get/Company/Work/:userId", async (req, res) => {
  // console.log(req.params.userId)
  const userId = parseInt(req.params.userId);
  const work = await prisma.job.findMany({
    where: {
      Branch: {
        Company: {
          userId: userId,
        },
      },
    },
    include: {
      Branch: {
        include: {
          Location: true,
          Company: true,
        },
      },
    },
  });

  res.json({
    message: "Get Work Success",
    data: work,
  });
});

//เพิ่มงาน
app.post("/company/addwork", upload.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  try {
    const { branchId, position, detail, num, requ, welfare, wages, jobDate, timeStart, timeEnd } = req.body;
    const { image } = req.files;
    if (!branchId || !position || !detail || !num || !requ || !welfare || !wages || !jobDate || !timeStart || !timeEnd || !image[0].filename) {
      res.status(401).json({ message: "กรุณาใส่ข้อมูลให้ครบ" });
    } else {
      const currentDate1 = new Date();
      const currentDate2 = new Date();
      const [hours1, minutes1] = timeStart.split(":");
      currentDate1.setHours(hours1);
      currentDate1.setMinutes(minutes1);
      const [hours2, minutes2] = timeEnd.split(":");
      currentDate2.setHours(hours2);
      currentDate2.setMinutes(minutes2);

      const createJob = await prisma.job.create({
        data: {
          branchId: Number(branchId),
          position: position,
          detail: detail,
          num: num,
          req: requ,
          welfare: welfare,
          wages: wages,
          jobDate: jobDate,
          timeStart: currentDate1,
          timeEnd: currentDate2,
          image: image[0].filename,
        },
      });
      res.json(createJob);
    }
  } catch (error) {
    res.status(401).json({ message: "กรุณาใส่ข้อมูลให้ครบ" });
    console.log(error);
  }
});

app.post("/comsignup", upload.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
  try {
    const { image } = req.files;
    const {
      name,
      businessType,
      contractName,
      contractPhone,
      email,
      password,
      taxNo,
      type,
      about,
      facebook,
      line,
      address,
      province,
      district,
      subDistrict,
      postCode,
    } = req.body;
    if (!taxNo || !type || !about || !facebook || !line || !address || !province || !district || !subDistrict || !postCode || !image[0].filename) {
      throw createHttpError(400, "กรุณาใส่ข้อมูลให้ครบ");
    } else {
      const createUser = await prisma.userAuth.create({
        data: {
          email: email,
          password: password,
          role: "ADMIN",
        },
      });

      const createLocation = await prisma.location.create({
        data: {
          address: address,
          province: province,
          district: district,
          subDistrict: subDistrict,
          postCode: postCode,
        },
      });

      const createCompany = await prisma.company.create({
        data: {
          userId: createUser.loginId,
          name: name,
          businessType: businessType,
          contractName: contractName,
          contractPhone: contractPhone,
          taxNo: taxNo,
          type: type,
          about: about,
          facebook: facebook,
          line: line,
          image: image[0].filename,
          locationId: createLocation.id,
        },
      });

      await prisma.branch.create({
        data: {
          id: createLocation.id,
          name: "สาขาหลัก",
          phone: createCompany.contractPhone,
          email: createUser.email,
          locationId: createLocation.id,
          companyId: createCompany.userId,
        },
      });
    }
    res.json({ message: "register successfully" });
  } catch (error) {
    res.status(error?.status || 500).json({ error: error?.message || "Internal server error" });
  }
});

app.get("/getMyProfile/:userId", async (req, res) => {
  const loginId = parseInt(req.params.userId);
  // console.log(loginId);
  const findUser = await prisma.userAuth.findUnique({
    select: {
      email: true,
      Jobber: {
        select: {
          firstName: true,
          lastName: true,
          nickName: true,
          sex: true,
          phone: true,
          birthday: true,
          lineId: true,
          image: true,
          idCard: true,
          portfolio: true,
        },
      },
    },
    where: {
      loginId: loginId,
    },
  });

  res.json({
    message: "Get Profile Success",
    data: findUser,
  });
});

app.post("/getBranch", async (req, res) => {
  const { userId } = parseInt(req.body);
  const branch = await prisma.company.findFirst({
    select: {
      Branch: {
        include: {
          Location: true,
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  res.json({
    message: "Get Branch Success",
    data: branch,
  });
});

app.get("/getBranch/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  // console.log(userId)
  const branch = await prisma.company.findFirst({
    select: {
      Branch: {
        include: {
          Location: true,
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  res.json({
    message: "Get Branch Success",
    data: branch,
  });
});

app.post("/getCountBranch", async (req, res) => {
  const { userId } = parseInt(req.body);
  const allBranch = await prisma.company.findMany({
    select: {
      _count: {
        select: {
          Branch: true,
        },
      },
    },

    where: {
      userId: userId,
    },
  });

  res.json({
    message: "Get Count Branch Success",
    data: allBranch,
  });
});

// get job list
app.get("/job/list", async (req, res) => {
  const jobList = await prisma.job.findMany({
    select: {
      id: true,
      position: true,
      // detail: true,
      wages: true,
      jobDate: true,
      num: true,
      Branch: {
        select: {
          name: true,
          Location: true,
          Company: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!jobList) res.status(404).json({ message: "Job List Not Found" });

  res.json(jobList);
});

// get detail each job
app.get("/job/:jobId", async (req, res) => {
  const jobId = parseInt(req.params.jobId);

  if (jobId === "undefined") {
    res.status(404).json({ message: "Job Detail Not Found" });
  } else {
    const jobDetail = await prisma.job.findUnique({
      select: {
        id: true,
        position: true,
        detail: true,
        num: true,
        req: true,
        welfare: true,
        wages: true,
        image: true,
        jobDate: true,
        timeStart: true,
        timeEnd: true,
        Branch: {
          select: {
            name: true,
            phone: true,
            email: true,
            Location: true,
            Company: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      where: {
        id: jobId,
      },
    });
    if (!jobDetail) res.status(404).json({ message: "Job Detail Not Found" });

    res.json(jobDetail);
  }
});

app.post("/enroll", async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const findJob = await prisma.jobManage.findMany({
      where: {
        jobberId: Number(userId),
        jobId: Number(jobId),
      },
    });

    if (findJob.length !== 0) throw createHttpError(400, "ไม่สามารถสมัครงานซ้ำได้");

    const createJobManage = await prisma.jobManage.create({
      data: {
        jobberId: parseInt(userId),
        jobId: parseInt(jobId),
        state: "waiting",
      },
    });

    res.json(createJobManage);
  } catch (error) {
    res.status(error?.status || 400).json({ message: error?.message });
  }
});

app.get("/mywork/:userId", async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId)
  try {
    const findMyWork = await prisma.jobManage.findMany({
      select: {
        jobId: true,
        state: true,
        Job: {
          select: {
            position: true,
            Branch: {
              select: {
                name: true,
                phone: true,
                email: true,
                Location: true,
              },
            },
          },
        },
      },
      where: {
        jobberId: parseInt(userId),
      },
    });
    res.json(findMyWork);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/get/enroll/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const findEnroll = await prisma.jobManage.findMany({
      where: {
        Job: {
          Branch: {
            Company: {
              userId: parseInt(userId),
            },
          },
        },
      },
      include: {
        Jobber: true,
        Job: {
          include: {
            Branch: true,
          },
        },
      },
    });
    res.json(findEnroll);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.patch("/update/enroll", async (req, res) => {
  const { jobId, jobberId, state } = req.body;
  console.log(jobId, jobberId, state);
  try {
    const findJob = await prisma.jobManage.findMany({
      where: {
        jobId: Number(jobId),
        jobberId: Number(jobberId),
      },
    });

    if (findJob.length === 0) throw createHttpError(404, "ไม่พบข้อมูล");
    
    const updateEnroll = await prisma.jobManage.update({
      where: {
        jobManageId: findJob[0]?.jobManageId,
      },
      data: {
        state: state,
      },
    });
    res.json(updateEnroll);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

app.post("/logout", (req, res) => {
  loginId = "";
  res.json({
    message: "Logout Success",
  });
});

app.listen(webPort, () => {
  console.log(`🚀 WebServer Listening on port ${webPort}`);
});
