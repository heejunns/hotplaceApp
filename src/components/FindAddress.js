import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import * as FindAddressStyle from "../styles/componenet/FindAddressStyle";
const FindAddress = () => {
  const [addressData, setAddressData] = useState({
    postcode: "",
    address: "",
    extraAddress: "",
  });
  const [isDaumPostcode, setIsDaumPostcode] = useState(false);
  const onComplete = (data) => {
    console.log("data", data);
    setAddressData((prev) => {
      return {
        ...prev,
        postcode: data.zonecode,
        address: data.address,
      };
    });
    setIsDaumPostcode((prev) => !prev);
  };

  const onchageInputExtraAddress = ({ target: { value } }) => {
    console.log("target", value);
    setAddressData((prev) => {
      return { ...prev, extraAddress: value };
    });
  };

  console.log("addressdata", addressData);

  return (
    <>
      <FindAddressStyle.FindeAddressLayout>
        <FindAddressStyle.FindAddressTopBox>
          <input disabled="true" value={addressData.postcode} />
          <button
            type="button"
            onClick={() => {
              console.log("hello world!");
              setIsDaumPostcode((prev) => !prev);
            }}
          >
            주소 찾기
          </button>
        </FindAddressStyle.FindAddressTopBox>
        <FindAddressStyle.FindAddressBottomBox>
          <input disabled="true" value={addressData.address} />
          <input
            placeholder="자세한 주소를 작성해주세요."
            value={addressData.extraAddress}
            onChange={onchageInputExtraAddress}
          />
        </FindAddressStyle.FindAddressBottomBox>
        {isDaumPostcode && (
          <FindAddressStyle.DaumPostcodeBox>
            <DaumPostcodeEmbed onComplete={onComplete} />
          </FindAddressStyle.DaumPostcodeBox>
        )}
      </FindAddressStyle.FindeAddressLayout>
    </>
  );
};

export default FindAddress;
