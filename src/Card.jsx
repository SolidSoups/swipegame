import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { Text } from "@react-three/drei";

export default function Card({ prompt, onSwipe }) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!down && Math.abs(mx) > 150) onSwipe(mx > 0 ? "yes" : "no");
    else api.start({ x: down ? mx / 100 : 0 });
  });

  return (
    <animated.mesh position-x={x} {...bind()}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial color="white" />
      <Text position={[0, 0, 0.01]} fontSize={0.3} color="black">
        {prompt}
      </Text>
    </animated.mesh>
  );
}
