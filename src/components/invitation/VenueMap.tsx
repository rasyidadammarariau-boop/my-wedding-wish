import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VenueMapProps {
  venueName: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  className?: string;
}

const VenueMap = ({
  venueName,
  address,
  latitude = -6.2088,
  longitude = 106.8456,
  googleMapsUrl,
  className = "",
}: VenueMapProps) => {
  // Create embed URL for Google Maps
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude}%C2%B0${longitude}%C2%B0!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid`;

  // Create directions URL
  const directionsUrl = googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Create search URL as fallback
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName + " " + address)}`;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Map Header */}
      <div className="text-center">
        <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
        <h3 className="text-2xl font-serif font-semibold">Lokasi Acara</h3>
        <p className="text-muted-foreground">Temukan lokasi acara dengan mudah</p>
      </div>

      {/* Venue Info Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Map Embed */}
          <div className="relative w-full h-64 md:h-80 bg-muted">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Peta lokasi ${venueName}`}
              className="absolute inset-0"
            />
          </div>

          {/* Venue Details */}
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-lg">{venueName}</h4>
              <p className="text-muted-foreground text-sm mt-1">{address}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => window.open(directionsUrl, "_blank")}
                className="flex-1 min-w-[140px]"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Petunjuk Arah
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(searchUrl, "_blank")}
                className="flex-1 min-w-[140px]"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Buka di Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueMap;
