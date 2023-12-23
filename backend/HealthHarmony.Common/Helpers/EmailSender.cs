using MailKit.Net.Smtp;
using MimeKit;

namespace HealthHarmony.Common.Helpers
{
    public static class EmailSender
    {
        public static void Send(string receiverName, string receiverEmail, string message)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("Health Harmony", "healthharmony.contact@gmail.com"));
            email.To.Add(new MailboxAddress(receiverName, receiverEmail));

            email.Subject = "Account password";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var smtp = new SmtpClient())
            {
                smtp.Connect("smtp.gmail.com", 587, false);

                smtp.Authenticate("healthharmony.contact@gmail.com", "zkud llmg cbsa cpsm");

                smtp.Send(email);
                smtp.Disconnect(true);
            }

        }
    }
}
