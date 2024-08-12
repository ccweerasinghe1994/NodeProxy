// middleware/filterResponse.js

export const filterResponse = (req, res, next) => {
    const filterParam = req.headers["x-filter-param"];
  
    if (!filterParam) {
      return next();
    }
  
    const originalSend = res.json;
  
    res.json = function (body) {
      let data = body.data;
  
      // Apply filtering logic based on the filterParam
      if (Array.isArray(data)) {
        data = data.filter(item => item[filterParam]);
      } else if (data && typeof data === "object") {
        data = Object.keys(data)
          .filter(key => key === filterParam)
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
      }
  
      body.data = data;
      res.json = originalSend;
      return res.json(body);
    };
  
    next();
  };