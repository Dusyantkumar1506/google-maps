import { useState, useEffect } from "react";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import LocationMarker from "./LocationMarker";

function Maps() {
  const [data, setData] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const fetchData = async () => {
      console.log(data, "Form Search data");
      const results = await provider.search({ query: data });
      setResults(results);
    };
    fetchData();
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (results.length > 0) {
      const label = results[0].label;
      setData(label);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          onChange={(e) => setData(e.target.value)}
          value={data}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      <MapContainer center={[51.505, -0.09]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {results.length > 0 && (
          <Marker position={[results[0].y, results[0].x]}>
            <Popup>{results[0].label}</Popup>
          </Marker>
        )}

        <LocationMarker />
      </MapContainer>
    </>
  );
}

export default Maps;
