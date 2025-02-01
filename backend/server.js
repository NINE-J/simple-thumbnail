const express = require('express');
const multer = require('multer');
const lqip = require('lqip');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// multer 설정: 파일의 원래 이름을 유지하고, 확장자를 추가합니다.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);

    // 파일 경로와 파일 존재 여부 확인
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    const lqipResult = await lqip.base64(filePath);

    //fs.unlinkSync(filePath); // 업로드된 파일 삭제
    res.json({ lqip: lqipResult });
  } catch (error) {
    console.error('Error generating lqip:', error);
    res.status(500).json({ error: 'Failed to generate lqip' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});