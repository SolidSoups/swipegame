import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { Text } from "@react-three/drei";

export default function Card({ prompt, onSwipe }) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const THRESHOLD = 1.5;

  const bind = useDrag(({ down, movement: [mx] }) => {
    const k = Math.pow(window.innerWidth * 0.5, 0.85);
    const eased = (Math.sign(mx) * Math.pow(Math.abs(mx), 0.85)) / k;
    if (!down && Math.abs(eased) > THRESHOLD) {
      onSwipe(mx > 0 ? "yes" : "no");
    } else {
      api.start({ x: down ? eased : 0 });
    }
  });

  return (
    <animated.mesh position-x={x} {...bind()}>
      <planeGeometry args={[3, 4]} />
      <animated.meshStandardMaterial
        color={
          x.to((v) =>
            v < -THRESHOLD ? "#ff4444" : v > THRESHOLD ? "#44ff44" : "#ffffff",
          )
          // interpolation !!
          // x.to([-THRESHOLD, 0, THRESHOLD], ["#ff4444", "#ffffff", "#44ff44"])
        }
      />
      <Text position={[0, 0, 0.01]} fontSize={0.3} color="black">
        {prompt}
      </Text>
    </animated.mesh>
  );
}
