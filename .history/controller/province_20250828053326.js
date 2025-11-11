(const Province = require("../controller/province");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.createProvince = catchAsync(async (req, res, next) => {
  const newProvince = await Province.create(req.body);
  res.status(200).json({
    status:'success',
    data:{
        province:newProvince,
    }
  })
});
exports.getAllProvinces=  catchAsync(async(req,res,next)=>{
    const provinces=await Province.find();
    
})
