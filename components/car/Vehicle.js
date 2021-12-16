import Body from "./Body";
import Tire from "./Tire";
import { useRef } from "react";
import { useRaycastVehicle } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useControls } from "../../util/useControls";
const Vehicle = () => {
  //Variables for the car
  const radius = 0.5;
  const width = 0.8;
  const height = -0.54;
  const front = 1.5;
  const back = -1.45;
  const steer = 0.75;
  const force = 2000;
  const maxBrake = 50;

  //Refs for the car
  const tire1 = useRef();
  const tire2 = useRef();
  const tire3 = useRef();
  const tire4 = useRef();
  const body = useRef();
  const controls = useControls();

  //default tire info
  const tireInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 25,
    suspensionRestLength: 0.1,
    maxSuspensionForce: 100000,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 1.8,
    dampingCompression: 1.5,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2,
  };

  const tireInfo1 = {
    ...tireInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width, height, front],
  };
  const tireInfo2 = {
    ...tireInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width, height, front],
  };
  const tireInfo3 = {
    ...tireInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width, height, back],
  };
  const tireInfo4 = {
    ...tireInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width, height, back],
  };

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: body,
    wheels: [tire1, tire2, tire3, tire4],
    wheelInfos: [tireInfo1, tireInfo2, tireInfo3, tireInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }));

  useFrame(() => {
    const { forward, backward, left, right, brake, reset, boost } =
      controls.current;
    api.set;
    // for (let e = 2; e < 4; e++) {
    //   api.applyEngineForce(
    //     forward || backward || boost
    //       ? force * (forward && !backward ? -1 : 1)
    //       : 0,

    //     2
    //   );
    // }

    for (let e = 2; e < 4; e++) {
      api.applyEngineForce(
        forward ? force * -1 : backward ? force * 1 : boost ? force * -2 : 0,

        2
      );
    }

    for (let s = 0; s < 2; s++)
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b);
    if (reset) {
      body.current.api.position.set(0, 1.5, 0);
      body.current.api.velocity.set(0, 0, 0);
      body.current.api.angularVelocity.set(0, 0, 0);
      body.current.api.rotation.set(0, Math.PI * 2, 0);
    }
  });

  return (
    <group ref={vehicle}>
      <Body ref={body} position={[0, 2, 0]} />
      <Tire ref={tire1} radius={radius} />
      <Tire ref={tire2} leftSide radius={radius} />
      <Tire ref={tire3} radius={radius} />
      <Tire ref={tire4} leftSide radius={radius} />
    </group>
  );
};

export default Vehicle;
