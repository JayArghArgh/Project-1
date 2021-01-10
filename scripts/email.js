//-------------------------------------------------------------Send email functions-------------------------------------------------------------------------//

//Send User ingredients vias Gmail SMTP
function sendEmail() {   
    
	Email.send({
	Host: "smtp.gmail.com",
	Username : "project1monash@gmail.com",
	Password : "epakqeohwuvlpxdm",
	To : modEmailInputObj.value,
	From : "project1monash@gmail.com",
	Subject : "Your Recipe",
	Body : 
	
	"Hi " + modNameInputObj.value + "! Thanks for using our recipe selection tool. Your recipe can be viewed via the link @  : " + apiResponseParsed.hits[modIndex].recipe.url + " " +
	
	"Ingredients : " +  apiResponseParsed.hits[modIndex].recipe.ingredientLines
		
	}).then(
		message => alert("Mail sent successfully - Please check your Junk Folder")
	);
}