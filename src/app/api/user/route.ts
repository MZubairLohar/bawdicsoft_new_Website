// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//     service: "Gmail", // Use your email service, like Gmail
//     secure: true,
//     port: 465,
//       auth: {
//         user: "ali4282271@gmail.com",
//         pass: "ztwd zzbv qeqr skvn",
//       },
//     });



// export const POST = async (req: NextRequest) => {
//     const { name, email, phoneNo, message, file } = await req.json();
//     console.log(name, email, phoneNo, message, file)

//     try {
//         await new Promise((resolve, reject) => {
//             // verify connection configuration
//             transporter.verify(function (error, success) {
//                 if (error) {
//                     console.log(error);
//                     reject(error);
//                 } else {
//                     console.log("Server is ready to take our messages");
//                     resolve(success);
//                 }
//             });
//         });
//         const mailOptions = {
//             from: email,
//             to: "ashrafalikakozai9876@gmail.com",
//             subject: name,
//             text: "this is some text",
//             html: `<h1>Hello ashraf</h1><p>my name is ${name} from karachi so i will meet with you tomorrow</p><p>~${message}</p><p>~${phoneNo}</p>`
//             ,
//         };
//         await new Promise((resolve, reject) => {
//             // send mail
//             transporter.sendMail(mailOptions, (err, info) => {
//                 if (err) {
//                     console.error(err);
//                     reject(err);
//                 } else {
//                     console.log(info);
//                     resolve(info);
//                 }
//             });
//         });
//     } catch (err) {
//         return NextResponse.json(err)
//     }

// }
// // await transporter.sendMail({
// // from:email,
// // to:"ashrafalikakozai9876@gmail.com",
// // subject:name,
// // text: "this is some text",
// // html:`<h1>Hello ashraf</h1><p>my name is ${name} from karachi so i will meet with you tomorrow</p><p>~${message}</p><p>~${phoneNo}</p>`
// // })
// // return NextResponse.json({ message: "hello" });


import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    secure: true,
    port: 465,
    auth: {
        user: "ali4282271@gmail.com",
        pass: "ztwd zzbv qeqr skvn",
    }
});
export const POST = async (req: Request, res: Response) => {
    const { name, email, phoneNo, message } = await req.json();
    try {
        const mailOptions = {
            from: email,
            to: "ashrafalikakozai9876@gmail.com",
            subject: name,
            text: "this is some text",
            html: `<h1>Hello ashraf</h1><p>my name is ${name} from karachi so i will meet with you tomorrow</p><p>~${message}</p><p>~${phoneNo}</p>`,
        };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    // console.log(info)
                }
            });
        return NextResponse.json(
            { message: "Message send Sucessfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Message send to Faild" },
            { status: 400 }
        );
    }
};
