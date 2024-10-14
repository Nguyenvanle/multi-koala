export default function Policy() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-background shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <ol className="list-decimal pl-5">
        <li className="mb-3">
          <strong>Information We Collect:</strong> We collect personal
          information such as your name, email, address, user activity, course
          statistics, and financial data for teachers and admins.
        </li>
        <li className="mb-3">
          <strong>Use of Information:</strong> The information collected is used
          to enhance user experience, provide course statistics, and manage
          financial transactions.
        </li>
        <li className="mb-3">
          <strong>Data Sharing:</strong> We do not share user data with third
          parties.
        </li>
        <li className="mb-3">
          <strong>Security:</strong> We implement security measures to protect
          your personal information.
        </li>
        <li className="mb-3">
          <strong>Age Restrictions:</strong> Our platform is designed for users
          aged 14 and older.
        </li>
        <li className="mb-3">
          <strong>Contact Information:</strong> For privacy-related questions,
          please contact us at{" "}
          <a
            href="mailto:duoakoala.official@gmail.com"
            className="text-primary"
          >
            duoakoala.official@gmail.com
          </a>
          .
        </li>
      </ol>
    </div>
  );
}
