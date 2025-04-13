import { useState, useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { toPng, toSvg } from 'html-to-image'
import InputForm from './InputForm'
import CustomizationPanel from './CustomizationPanel'
import LogoUploader from './LogoUploader'

function QRCodeGenerator() {
  const [qrData, setQrData] = useState({
    type: 'url',
    content: '',
    style: {
      fgColor: '#000000',
      bgColor: '#ffffff',
      gradientType: 'none',
      moduleStyle: 'dots',
      eyeStyle: 'square',
      errorLevel: 'M'
    },
    logo: null
  })

  const qrRef = useRef(null)
  const [qrCode, setQrCode] = useState(null)

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qrData.content || ' ',
      dotsOptions: {
        color: qrData.style.fgColor,
        type: qrData.style.moduleStyle,
        gradient: qrData.style.gradientType !== 'none' ? {
          type: qrData.style.gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: qrData.style.fgColor },
            { offset: 1, color: qrData.style.gradientColor || qrData.style.fgColor }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: qrData.style.bgColor
      },
      cornersSquareOptions: {
        type: qrData.style.eyeStyle
      },
      errorCorrectionLevel: qrData.style.errorLevel,
      // Add logo configuration
      image: qrData.logo,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.4,
        hideBackgroundDots: true
      }
    })

    setQrCode(qr)
    if (qrRef.current && qr) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  }, [qrData])

  const handleDownload = async (format) => {
    if (!qrRef.current) return

    try {
      let dataUrl
      if (format === 'png') {
        dataUrl = await toPng(qrRef.current)
      } else if (format === 'svg') {
        dataUrl = await toSvg(qrRef.current)
      }

      const link = document.createElement('a')
      link.download = `qrcode.${format}`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <InputForm qrData={qrData} setQrData={setQrData} />
          <CustomizationPanel qrData={qrData} setQrData={setQrData} />
          <LogoUploader qrData={qrData} setQrData={setQrData} />
        </div>
        <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">
          <div ref={qrRef} className="bg-white p-4 sm:p-8 rounded-xl shadow-lg flex justify-center items-center min-h-[300px] sm:min-h-[400px]" />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleDownload('png')}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-md"
            >
              Download PNG
            </button>
            <button
              onClick={() => handleDownload('svg')}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-md"
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeGenerator