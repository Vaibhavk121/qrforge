function CustomizationPanel({ qrData, setQrData }) {
  const moduleStyles = ['dots', 'rounded', 'square']
  const eyeStyles = ['circle', 'square', 'rounded']
  const errorLevels = ['L', 'M', 'Q', 'H']

  const updateStyle = (key, value) => {
    setQrData({
      ...qrData,
      style: { ...qrData.style, [key]: value }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Style Your QR Code</h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="block text-sm text-gray-600">Foreground</span>
              <div className="relative">
                <input
                  type="color"
                  value={qrData.style.fgColor}
                  onChange={(e) => updateStyle('fgColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <span className="block text-sm text-gray-600">Background</span>
              <div className="relative">
                <input
                  type="color"
                  value={qrData.style.bgColor}
                  onChange={(e) => updateStyle('bgColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Module Style</label>
            <div className="grid grid-cols-3 gap-2">
              {moduleStyles.map((style) => (
                <button
                  key={style}
                  className={`p-3 rounded-lg transition-all ${
                    qrData.style.moduleStyle === style
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => updateStyle('moduleStyle', style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Eye Style</label>
            <div className="grid grid-cols-3 gap-2">
              {eyeStyles.map((style) => (
                <button
                  key={style}
                  className={`p-3 rounded-lg transition-all ${
                    qrData.style.eyeStyle === style
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => updateStyle('eyeStyle', style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Error Correction</label>
          <div className="grid grid-cols-4 gap-2">
            {errorLevels.map((level) => (
              <button
                key={level}
                className={`p-3 rounded-lg transition-all ${
                  qrData.style.errorLevel === level
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => updateStyle('errorLevel', level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizationPanel