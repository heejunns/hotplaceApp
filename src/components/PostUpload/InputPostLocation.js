import {
  InputTitle,
  MapBox,
  PostUploadMapBox,
} from "../../styles/pages/PostUpload.style";
import Map from "../Map";

const InputPostLocation = ({
  setUserMarkerLocation,
  mapStatus,
  onclickMapButton,
}) => {
  return (
    <PostUploadMapBox>
      <InputTitle>장소 등록</InputTitle>
      <MapBox>
        {mapStatus ? (
          <Map setUserMarkerLocation={setUserMarkerLocation} />
        ) : (
          <span
            className="material-symbols-outlined"
            onClick={onclickMapButton}
          >
            add_location_alt
          </span>
        )}
      </MapBox>
    </PostUploadMapBox>
  );
};

export default InputPostLocation;
