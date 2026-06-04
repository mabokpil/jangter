'use client'

import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

interface Props {
  name: string
  address: string
}

export default function Map({ name, address }: Props) {
  useEffect(() => {
    import('leaflet').then(L => {
      const container = document.getElementById('map') as HTMLElement
      if ((container as any)._leaflet_id) return

      // 아이콘 fix
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(container).setView([36.5, 127.5], 7)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ' South Korea')}&format=json&limit=1`
      )
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat)
            const lon = parseFloat(data[0].lon)
            map.setView([lat, lon], 16)
            L.marker([lat, lon]).addTo(map).bindPopup(name).openPopup()
          }
        })
    })
  }, [address, name])

  return <div id="map" className="w-full h-64 rounded-2xl z-0" />
}
