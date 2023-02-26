const uploadFileMiddleware = require("../middleware/fileupload");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({
        message: "Please upload a valid mp4 file!",
      });
    }

    const stream = fs.createWriteStream(req.file.originalname);

    stream.on("open", () => req.pipe(stream));

    stream.on("data", (chunk) => console.log(chunk.toString()));

    stream.on("drain", () => {
      // Calculate how much data has been piped yet
      const written = parseInt(stream.bytesWritten);
      const total = parseInt(headers["content-length"]);
      const pWritten = ((written / total) * 100).toFixed(2);
      console.log(`Processing  ...  ${pWritten}% done`);
    });

    stream.on("close", () =>
      res.status(200).send({
        message: "Uploaded file successfully: " + req.file.originalname,
      })
    );

    stream.on("error", () =>
      res
        .status(500)
        .send({ message: "Some error occured while uploading file" })
    );

    // res.status(200).send({
    //   message: "Uploaded the file successfully: " + req.file.originalname,
    // });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getFile = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/data/";
  const filePath = directoryPath + fileName;

  console.log("filePath~~~~~~~~~>", filePath);

  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => console.log(chunk.toString()));

  stream.on("open", () => req.pipe(stream));

  //   stream.on("drain", () => {
  //     // Calculate how much data has been piped yet
  //     const written = parseInt(stream.bytesWritten);
  //     const total = parseInt(headers["content-length"]);
  //     const pWritten = ((written / total) * 100).toFixed(2);
  //     console.log(`Processing  ...  ${pWritten}% done`);
  //   });

  //   stream.on("error", () =>
  //     res.status(500).send({ message: "Some error occured while reading file" })
  //   );

  stream.on("close", () =>
    res.status(200).send({
      message: "Read file successfully: " + filePath,
    })
  );

  //   res.sendFile(directoryPath + fileName, fileName, (err) => {
  //     if (err) {
  //       res.status(500).send({
  //         message: "Could not download the file. " + err,
  //       });
  //     }
  //   });
};

module.exports = {
  uploadFile,
  getFile,
};
