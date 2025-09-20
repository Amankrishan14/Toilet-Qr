const QRCode = require('qrcode')
const fs = require('fs')
const path = require('path')
const { createCanvas, loadImage } = require('canvas')

// Base URL for your app (update this when deploying)
const BASE_URL = 'http://localhost:3000'

async function generateFascinoQRCode(url, toiletId) {
  // Generate basic QR code with higher resolution
  const qrCodeDataURL = await QRCode.toDataURL(url, {
    width: 250,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })

  // Create canvas for the final image
  const canvas = createCanvas(300, 300)
  const ctx = canvas.getContext('2d')

  // First, draw the QR code as the base layer
  const qrImage = await loadImage(qrCodeDataURL)
  ctx.drawImage(qrImage, 25, 25, 250, 250)

  // Now add the Fascino branding as overlays
  // Draw the outer app icon background (rounded square) - semi-transparent
  const outerSize = 280
  const outerX = (300 - outerSize) / 2
  const outerY = (300 - outerSize) / 2
  const cornerRadius = 20

  // Draw the four quadrants with some transparency
  ctx.globalAlpha = 0.3
  ctx.fillStyle = '#3B82F6' // Blue - top left
  ctx.fillRect(outerX, outerY, outerSize / 2, outerSize / 2)
  
  ctx.fillStyle = '#EF4444' // Red - top right
  ctx.fillRect(outerX + outerSize / 2, outerY, outerSize / 2, outerSize / 2)
  
  ctx.fillStyle = '#F59E0B' // Yellow - bottom left
  ctx.fillRect(outerX, outerY + outerSize / 2, outerSize / 2, outerSize / 2)
  
  ctx.fillStyle = '#10B981' // Green - bottom right
  ctx.fillRect(outerX + outerSize / 2, outerY + outerSize / 2, outerSize / 2, outerSize / 2)

  // Add rounded corners to the outer square
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.roundRect(outerX, outerY, outerSize, outerSize, cornerRadius)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1.0

  // Add "Fascino" text in the red quadrant
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Fascino', outerX + outerSize * 0.75, outerY + outerSize * 0.25)

  // Add a small Fascino logo in the center (smaller so it doesn't interfere with QR)
  const innerSize = 30
  const innerX = 150 - innerSize / 2
  const innerY = 150 - innerSize / 2

  // Draw inner four quadrants
  ctx.fillStyle = '#3B82F6' // Blue
  ctx.fillRect(innerX, innerY, innerSize / 2, innerSize / 2)
  
  ctx.fillStyle = '#EF4444' // Red
  ctx.fillRect(innerX + innerSize / 2, innerY, innerSize / 2, innerSize / 2)
  
  ctx.fillStyle = '#F59E0B' // Yellow
  ctx.fillRect(innerX, innerY + innerSize / 2, innerSize / 2, innerSize / 2)
  
  ctx.fillStyle = '#10B981' // Green
  ctx.fillRect(innerX + innerSize / 2, innerY + innerSize / 2, innerSize / 2, innerSize / 2)

  // Add rounded corners to inner square
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.roundRect(innerX, innerY, innerSize, innerSize, 6)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'

  // Add "F" in the center
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('F', innerX + innerSize / 2, innerY + innerSize / 2 + 3)

  return canvas.toBuffer('image/png')
}

async function generateQRCodes() {
  console.log('🚽 Generating Fascino-branded QR codes for toilet feedback system...')
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'qr-codes')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate QR codes for toilets 1-50
  for (let i = 1; i <= 50; i++) {
    const toiletId = `toilet_${i}`
    const url = `${BASE_URL}/toilet/${toiletId}`
    
    try {
      // Generate Fascino-branded QR code
      const buffer = await generateFascinoQRCode(url, toiletId)
      
      // Save QR code image
      const filename = `${toiletId}_qr.png`
      const filepath = path.join(outputDir, filename)
      fs.writeFileSync(filepath, buffer)
      
      console.log(`✅ Generated Fascino-branded QR code for ${toiletId}`)
    } catch (error) {
      console.error(`❌ Error generating QR code for ${toiletId}:`, error.message)
    }
  }

  // Generate HTML page with all QR codes
  generateQRCodePage(outputDir)
  
  console.log(`\n🎉 QR code generation complete!`)
  console.log(`📁 QR codes saved to: ${outputDir}`)
  console.log(`🌐 View all QR codes at: ${BASE_URL}/qr-codes`)
}

function generateQRCodePage(outputDir) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toilet QR Codes - Admin View</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Toilet QR Codes</h1>
        <p class="text-center text-gray-600 mb-8">Scan any QR code to submit feedback for that specific toilet</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            ${Array.from({ length: 50 }, (_, i) => {
              const toiletId = `toilet_${i + 1}`
              const qrPath = `./${toiletId}_qr.png`
              return `
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                    <h3 class="font-semibold text-gray-800 mb-2">${toiletId.replace('_', ' ').toUpperCase()}</h3>
                    <img src="${qrPath}" alt="QR Code for ${toiletId}" class="mx-auto mb-2" style="width: 150px; height: 150px;">
                    <p class="text-xs text-gray-500">Building ${String.fromCharCode(65 + Math.floor(i / 3))} - ${['Ground Floor', 'First Floor', 'Second Floor'][i % 3]}</p>
                </div>
              `
            }).join('')}
        </div>
        
        <div class="mt-12 text-center">
            <a href="/admin" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View Admin Dashboard
            </a>
        </div>
    </div>
</body>
</html>
  `
  
  fs.writeFileSync(path.join(outputDir, 'index.html'), html)
  console.log('📄 Generated QR codes overview page')
}

// Run the script
generateQRCodes().catch(console.error)
