import { useState } from 'react'

export interface UserSettings {
  currency: 'USD' | 'EUR' | 'BTC'
  refreshInterval: number
  showSmallBalances: boolean
  theme: 'dark' | 'light'
}

interface SettingsProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ settings, onSettingsChange, isOpen, onClose }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings)

  const handleSave = () => {
    onSettingsChange(localSettings)
    onClose()
  }

  const handleCancel = () => {
    setLocalSettings(settings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h3>Settings</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        
        <div className="settings-content">
          <div className="setting-group">
            <label>Currency</label>
            <select 
              value={localSettings.currency}
              onChange={(e) => setLocalSettings({
                ...localSettings, 
                currency: e.target.value as UserSettings['currency']
              })}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="BTC">BTC (₿)</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Auto Refresh (minutes)</label>
            <select
              value={localSettings.refreshInterval}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                refreshInterval: parseInt(e.target.value)
              })}
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>

          <div className="setting-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={localSettings.showSmallBalances}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  showSmallBalances: e.target.checked
                })}
              />
              Show small balances (&lt; $1)
            </label>
          </div>

          <div className="setting-group">
            <label>Theme</label>
            <select
              value={localSettings.theme}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                theme: e.target.value as UserSettings['theme']
              })}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div className="settings-actions">
          <button onClick={handleCancel} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}