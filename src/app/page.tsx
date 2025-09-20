import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🚽 Toilet Feedback System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scan QR codes to provide feedback on toilet cleanliness, water availability, and soap availability. 
            Help us maintain clean and well-stocked facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* How it works */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-gray-700">Find a QR code posted near any toilet</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-gray-700">Scan the QR code with your phone camera</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <p className="text-gray-700">Fill out the quick feedback form</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <p className="text-gray-700">Submit your feedback instantly</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <p className="text-gray-700">Rate cleanliness (1-5 stars)</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <p className="text-gray-700">Report water availability</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <p className="text-gray-700">Report soap availability</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <p className="text-gray-700">Add optional comments</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <p className="text-gray-700">Real-time data collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="text-center mt-12 space-x-4">
          <Link
            href="/admin"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/qr-codes"
            className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            View QR Codes
          </Link>
        </div>

        {/* Demo info */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Demo Mode</h3>
          <p className="text-yellow-700">
            This is a demo with 50 sample toilets (toilet_1 to toilet_50). 
            Each toilet has its own unique QR code that links to a feedback form.
          </p>
        </div>
      </div>
    </div>
  )
}