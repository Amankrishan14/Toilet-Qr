'use client'

export default function QRCodesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Toilet QR Codes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All QR codes for the toilet feedback system. Each QR code links to a specific toilet&apos;s feedback form.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 50 }, (_, i) => {
            const toiletId = `toilet_${i + 1}`
            const building = String.fromCharCode(65 + Math.floor(i / 3))
            const floor = ['Ground Floor', 'First Floor', 'Second Floor'][i % 3]
            
            return (
              <div key={toiletId} className="bg-white rounded-lg shadow-md p-4 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {toiletId.replace('_', ' ').toUpperCase()}
                </h3>
                <div className="w-32 h-32 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <img 
                    src={`/qr-codes/${toiletId}_qr.png`}
                    alt={`QR Code for ${toiletId}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Building {building} - {floor}
                </p>
                <a
                  href={`/toilet/${toiletId}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Test Form →
                </a>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">QR Code Generation</h3>
            <p className="text-blue-700 mb-4">
              To generate actual QR code images, run the following command:
            </p>
            <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
              node scripts/generate-qr-codes.js
            </code>
            <p className="text-blue-700 mt-4 text-sm">
              This will create PNG files for each toilet QR code in the public/qr-codes directory.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
