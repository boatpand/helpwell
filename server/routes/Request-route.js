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


// Get all RequestID with waiting
router.route("/all-request").get((req, res, next) => {
  RequestSchema.find({ Status: "รอการช่วยเหลือ" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// Get all RequestID accept from helper
router.route("/accept/:id").get((req, res, next) => {
  RequestSchema.findOne({ RequestID:req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// Get Helpcode from RequestID with wait for help status
router.route("/all-request-helpcode/:RequestID").get((req, res, next) => {
  RequestDetailSchema.find({ $and: [{ RequestID: req.params.RequestID }, { Status: "รอการช่วยเหลือ" }] }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// Get Helpcode from RequestID with accept help status
router.route("/all-accept-helpcode/:RequestID").get((req, res, next) => {
  RequestDetailSchema.find({ RequestID: req.params.RequestID }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 101 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 102 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 104 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 105 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 103 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find(
    { $and: [{ Helpcode: 106 }, { Status: "รอการช่วยเหลือ" }] },
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
  RequestDetailSchema.find({ Helpcode: "106" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get request with request id
router.route(`/request-detail/:id`).get((req, res, next) => {
  RequestSchema.findOne({ RequestID: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get request detail with request id
router.route(`/request-detail-detail/:id`).get((req, res, next) => {
  RequestDetailSchema.find({ RequestID: req.params.id }, (error, data) => {
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

// update status for accept help from helper to RequestSchema
router.route(`/update-help/:RequestID`).put((req, res, next) => {
  RequestSchema.findOneAndUpdate(
    { RequestID: req.params.RequestID },
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

// update status for accept help from helper to RequestDetailSchema
router.route(`/update-help-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.updateMany(
    { RequestID: req.params.RequestID },
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

// update status food helpcode in RequestDetailSchema
router.route(`/update-food-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 101 }, { RequestID: req.params.RequestID }] },
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

// update status medicine helpcode in RequestDetailSchema
router.route(`/update-medicine-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 102 }, { RequestID: req.params.RequestID }] },
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

// update status bed helpcode in RequestDetailSchema
router.route(`/update-bed-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 103 }, { RequestID: req.params.RequestID }] },
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

// update status hospital helpcode in RequestDetailSchema
router.route(`/update-hospital-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 104 }, { RequestID: req.params.RequestID }] },
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

// update status home helpcode in RequestDetailSchema
router.route(`/update-home-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 105 }, { RequestID: req.params.RequestID }] },
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

// update status other helpcode in RequestDetailSchema
router.route(`/update-other-detail/:RequestID`).put((req, res, next) => {
  RequestDetailSchema.findOneAndUpdate(
    { $and: [{ Helpcode: 106 }, { RequestID: req.params.RequestID }] },
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