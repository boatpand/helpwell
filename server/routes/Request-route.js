let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Request model
let RequestSchema = require("../models/Request");
// Request_Detail mmodel
let RequestDetailSchema = require("../models/Request_Detail");
// Helpcode model
let HelpCodeSchema = require("../models/Helpcode");

// Insert Request in RequestSchema
router.route("/insert").post((req, res, next) => {
  RequestSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(error);
      res.json(data);
    }
  });
});

// Insert Request_Detail in RequestDetailSchema
router.route("/insert-detailed").post((req, res, next) => {
  RequestDetailSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(error);
      res.json(data);
    }
  });
});


// Get all requests with no status
router.route("/all-request-no-status").get((req, res, next) => {
  RequestSchema.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all request with waiting
router.route("/all-request").get((req, res, next) => {
  RequestSchema.find({ Status: "รอการช่วยเหลือ" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all request with helping
router.route("/all-request/help").get((req, res, next) => {
  RequestSchema.find({ Status: "กำลังช่วยเหลือ" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all request with success
router.route("/all-request/success").get((req, res, next) => {
  RequestSchema.find({ Status: "ช่วยเหลือสำเร็จ" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all requests with no status
router.route("/all-request-no-status").get((req, res, next) => {
  RequestSchema.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get request by Mobile
router.route("/request/:mobile").get((req, res, next) => {
  RequestSchema.find({ Mobile: req.params.mobile }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// For Radio box filter
// Get food request
router.route("/food-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Food: true }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Getfood request with no status
router.route("/food-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: "101" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get medicine request
router.route("/medicine-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Medicine: true }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get medicine request with no status
router.route("/medicine-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: "102" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get hospital request
router.route("/hospital-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Hospital: true }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get hospital request with no status
router.route("/hospital-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: "104" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get home request
router.route("/home-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Home: true }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get home request with no status
router.route("/home-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: "105" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get bed request
router.route("/bed-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Bed: true }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get bed request with no status
router.route("/bed-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: "103" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get other request
router.route("/other-request").get((req, res, next) => {
  RequestSchema.find(
    { $and: [{ Other: { $ne: "" } }, { Status: "รอการช่วยเหลือ" }] },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get other request with no status
router.route("/other-request-no-status").get((req, res, next) => {
  RequestDetailSchema.find({ Helpcode: { $ne: "" } }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get request detail with request id
router.route(`/request-detail/:id`).get((req, res, next) => {
  RequestSchema.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get request detail with request id
router.route(`/request-detailed/:id`).get((req, res, next) => {
  RequestDetailSchema.find({ RequestID: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// update status for accept help from helper
router.route(`/update-help/:RequestID`).put((req, res, next) => {
  RequestSchema.findOneAndUpdate(
    { _id: req.params.RequestID },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// update status & Status Text
router.route(`/update-status/:RequestID`).put((req, res, next) => {
  RequestSchema.findOneAndUpdate(
    { _id: req.params.RequestID },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = router;
