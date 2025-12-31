export default function TermsAndConditionsPage() {
  return (
    <div className="p-2">
      <div className="h-full overflow-y-auto max-w-200 w-full mx-auto">
        <div className="flex flex-col gap-4 p-4">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Introduction</h2>
            <p className="text-sm">
              Welcome to Planary. By downloading, installing, and using our
              application, you agree to be bound by these Terms and Conditions.
              If you do not agree with these Terms, you should not use the App.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Description of Service</h2>
            <p className="text-sm">
              Planary is an expense management application that allows users to
              track and manage their expenses. It is provided by Jahbyte
              Technologies.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">User Account</h2>
            <p className="text-sm">
              To use certain features of the App, you may be required to create
              an account by providing your email and password. You are
              responsible for maintaining the confidentiality of your login
              information and for all activities that occur under your account.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">User Responsibilities</h2>
            <p className="text-sm">
              You agree to use the App only for lawful purposes.
            </p>
            <p className="text-sm">
              You must not misuse the App by introducing viruses, malware, or
              any other harmful material.
            </p>
            <p className="text-sm">
              You are responsible for ensuring the accuracy of any information
              you input into the App, including expense details.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">
              Data Collection and Privacy
            </h2>
            <p className="text-sm">
              We value your privacy. By using the App, you agree to our
              collection and use of certain personal data, as outlined in our
              Privacy Policy. We do not collect financial data such as bank
              details or payment card information. User-provided data, such as
              email addresses and passwords, are encrypted and stored securely.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Intellectual Property</h2>
            <p className="text-sm">
              All content, features, and functionality of the App, including but
              not limited to design, text, graphics, logos, and software, are
              the intellectual property of Jahbyte Technologies or its
              licensors. Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">
              Limitation of Liability
            </h2>
            <p className="text-sm">
              We strive to ensure that the App operates effectively and
              securely, but we do not guarantee that the App will be error-free
              or available at all times. To the extent permitted by law, Expense
              Tracker will not be liable for any direct, indirect, incidental,
              or consequential damages arising out of the use of or inability to
              use the App.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Termination</h2>
            <p className="text-sm">
              We reserve the right to terminate or suspend your account at any
              time, with or without notice, if you violate these Terms or engage
              in unlawful activity.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Changes to Terms</h2>
            <p className="text-sm">
              We may modify these Terms at any time. Any changes will be
              effective when we post the updated Terms within the App. Your
              continued use of the App after such changes means that you accept
              the modified Terms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Governing Law</h2>
            <p className="text-sm">
              These Terms are governed by and construed in accordance with the
              laws of Nigeria, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-extrabold">Contact Information</h2>
            <p className="text-sm">
              If you have any questions or concerns regarding these Terms, you
              can contact us at: support@jahbyte.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
