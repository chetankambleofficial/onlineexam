import { Link } from "react-router-dom";

function IssueNotice() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Issue Notice for Students</h2>
                <p className="text-lg text-gray-600 mb-4">
                    This section allows lecturers to issue important notices to students. Notices can be about exam schedules, class activities, or other essential announcements.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Make sure to provide clear and concise information in your notice. Notices will be displayed to students once created.
                </p>
                
                {/* Link to create notice */}
                <Link
                    to="/createnotice"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-center mb-4 block transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Create a New Notice
                </Link>
                
                {/* Additional helpful section */}
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Notice Guidelines</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        <li className="mb-2">Ensure the notice is brief and clear.</li>
                        <li className="mb-2">Include necessary details like date, time, and location.</li>
                        <li className="mb-2">Review before posting to avoid mistakes.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default IssueNotice;
