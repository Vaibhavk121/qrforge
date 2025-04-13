import { useState } from 'react'

function InputForm({ qrData, setQrData }) {
  const contentTypes = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'Text' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'vcard', label: 'vCard Contact' }
  ]

  const handleTypeChange = (type) => {
    setQrData({ ...qrData, type, content: '' })
  }

  const renderInputFields = () => {
    switch (qrData.type) {
      case 'url':
        return (
          <input
            type="url"
            placeholder="Enter URL"
            className="w-full p-2 border rounded"
            value={qrData.content}
            onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
          />
        )

      case 'wifi':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="SSID"
              className="w-full p-2 border rounded"
              onChange={(e) => setQrData({
                ...qrData,
                content: `WIFI:S:${e.target.value};T:WPA;P:${qrData.content.split(';P:')[1] || ''};H:false;;`
              })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              onChange={(e) => setQrData({
                ...qrData,
                content: `WIFI:S:${qrData.content.split(';T:')[0].split(':S:')[1] || ''};T:WPA;P:${e.target.value};H:false;;`
              })}
            />
          </div>
        )

      case 'vcard':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              onChange={(e) => updateVCard('FN', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              onChange={(e) => updateVCard('EMAIL', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              onChange={(e) => updateVCard('TEL', e.target.value)}
            />
            <input
              type="text"
              placeholder="Organization"
              className="w-full p-2 border rounded"
              onChange={(e) => updateVCard('ORG', e.target.value)}
            />
          </div>
        )

      default:
        return (
          <input
            type="text"
            placeholder="Enter content"
            className="w-full p-2 border rounded"
            value={qrData.content}
            onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
          />
        )
    }
  }

  const updateVCard = (field, value) => {
    const vCardTemplate = `BEGIN:VCARD
VERSION:3.0
FN:${field === 'FN' ? value : ''}
EMAIL:${field === 'EMAIL' ? value : ''}
TEL:${field === 'TEL' ? value : ''}
ORG:${field === 'ORG' ? value : ''}
END:VCARD`
    setQrData({ ...qrData, content: vCardTemplate })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Content Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            className={`p-3 rounded ${
              qrData.type === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleTypeChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderInputFields()}</div>
    </div>
  )
}

export default InputForm