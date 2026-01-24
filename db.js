const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

mongoose.connect("mongodb+srv://avtanshdi_db_user:VT4DVHuhjVvG0k95@cluster0.dvg4omi.mongodb.net/courseera-app")

const userSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname: String,
    lastname: String
})

const adminSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname: String,
    lastname: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new Schema({
    userId:{
      type: ObjectId,
      ref:"user"
    },
    courseId: {
        type:ObjectId,
        ref: "course"  
    }
})

const userModel = mongoose.model('user',userSchema);
const courseModel = mongoose.model('course',courseSchema);
const adminModel = mongoose.model('admin',adminSchema);
const purchaseModel = mongoose.model('purchase',purchaseSchema);

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}