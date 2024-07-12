import {
  InputTitle,
  MapBox,
  MapInput,
  PostUploadMapBox,
} from "../../styles/pages/PostUpload.style";
import Map from "../Map";

const InputPostLocation = ({
  setUserMarkerLocation,
  mapStatus,
  onclickMapButton,
  register,
}) => {
  return (
    <PostUploadMapBox>
      <InputTitle>장소 등록</InputTitle>
      <MapBox>
        <MapInput
          {...register("location", {
            required: "위치를 등록해주세요.",
          })}
        />
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
