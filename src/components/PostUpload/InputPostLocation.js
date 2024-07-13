import {
  InputTitle,
  MapBox,
  MapInnerBox,
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
          <MapInnerBox onClick={onclickMapButton}>
            장소 등록하기
            <span className="material-symbols-outlined">add_location_alt</span>
          </MapInnerBox>
        )}
      </MapBox>
    </PostUploadMapBox>
  );
};

export default InputPostLocation;
