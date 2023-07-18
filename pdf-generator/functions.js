const   pdf         =   require('pdf-creator-node'),
        fs          =   require('fs'),
        path        =   require('path'),
        carBookings =   require('../models/carBookings');

//Setting up environment variables and links
var linkStarting ;
//if we are not in the production level (in development phase/level)
if(process.env.NODE_ENV !== 'production'){    
    linkStarting = 'http://localhost:3000';
}else{
    linkStarting = 'https://hangurentacar.herokuapp.com';
}        

async function generateInvoicePDF(reservationId,req,res){
    if(reservationId){
        await carBookings.findById(reservationId)
        .then(reservation=>{
            const html = fs.readFileSync(path.join(__dirname,'../views/template.html'),'utf-8');
            const fileName = reservation.customerName + ' (' + reservation.referenceNo + ') Invoice' + '.pdf';
            const filePath = linkStarting+'/docs/' + fileName ;
            const invoiceName = reservation.customerName + ' (' + reservation.referenceNo + ') Invoice';
            

            const obj = {
                customerName        : reservation.customerName,
                customerPhoneNumber : reservation.phoneNumber,
                customerEmail       : reservation.customerEmail,

                confirmingDate      : reservation.confirmingDate,
                confirmingTime      : reservation.confirmingTime,

                referenceNumber     : reservation.referenceNo,

                carImage            : reservation.carImage,
                carName             : reservation.carName,
                reservationDate     : reservation.bookingDate,
                returningDate       : reservation.returningDate,

                rent                : reservation.rent,
                paidAmounts         : reservation.paidAmounts,
                remainingAmounts    : (reservation.rent - reservation.paidAmounts),

                linkStarting        : linkStarting
            }

            const document = {
                html : html ,
                data : {
                    reservation : obj
                },
                path : './docs/' + fileName ,
            }

            pdf.create(document,{formate:'A4'})
            .then(pdf=>{
                carBookings.findByIdAndUpdate(reservationId,{invoicePath    : filePath,
                                                             invoiceName    : invoiceName,
                                                             })
                .then(()=>{
                    res.render('downloadInvoice.ejs',{sentTitle:'PDF Document',filePath:filePath,fileName:invoiceName});
                }).catch(error=>{
                    if(req.user.role == 'admin' || req.user.role =='dbUser'){
                        req.flash('error',JSON.stringify(error.message));
                        res.redirect('/adminPanel/2/cars');
                    }else{
                        req.flash('error',JSON.stringify(error.message));
                        res.redirect('/customer/dashboard/2/reservations');
                    }
                })
            })
            .catch(error=>{
                if(req.user.role == 'admin' || req.user.role =='dbUser'){
                    req.flash('error',JSON.stringify(error.message));
                    res.redirect('/adminPanel/2/cars');
                }else{
                    req.flash('error',JSON.stringify(error.message));
                    res.redirect('/customer/dashboard/2/reservations');
                }
            })
        })
    }else{
        if(req.user.role == 'admin' || req.user.role =='dbUser'){
            req.flash('error','Reservation Id is required (Not provided');
            res.redirect('/adminPanel/2/cars');
        }else{
            req.flash('error','Reservation Id is required, (Not provided');
            res.redirect('/customer/dashboard/2/reservations');
        }
    }
}

module.exports = {
    generateInvoicePDF,
}