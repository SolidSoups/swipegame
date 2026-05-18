import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { Text } from "@react-three/drei";

export default function Card({ prompt, onSwipe }) {
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 20 },
  }));

  const THRESHOLD = 1.2;

  const bind = useDrag(({ down, movement: [mx], velocity: [vx] }) => {
    const k = Math.pow(window.innerWidth * 0.5, 0.85);
    const eased = (Math.sign(mx) * Math.pow(Math.abs(mx), 0.85)) / k;

    if (!down) {
      const momentumTarget = eased + vx * 0.1; // add velocity based momentum
      if (Math.abs(momentumTarget) > THRESHOLD) {
        const direction = momentumTarget > 0 ? "yes" : "no";

        // animate the card off-screen
        api.start({
          x: momentumTarget > 0 ? 6 : -6,
          onRest: () => onSwipe(direction),
        });
      } else {
        api.start({ x: 0 });
      }
    } else {
      api.start({ x: eased });
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
