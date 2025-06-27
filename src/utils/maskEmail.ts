export function maskEmail(email: string) {
 // Split the email into two parts: before and after the '@'
 const [localPart, domain] = email.split("@");

 // Mask the local part
 const maskedLocalPart = localPart.slice(0, 3) + "***";

 // Combine the masked local part with the domain
 return `${maskedLocalPart}@${domain}`;
}