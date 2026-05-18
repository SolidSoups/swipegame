import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { Text } from "@react-three/drei";

export default function Card({ prompt, onSwipe }) {
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 200, friction: 30 },
  }));

  const THRESHOLD = 1.0;

  const bind = useDrag(({ down, movement: [mx, my], velocity: [vx, vy] }) => {
    const k = Math.pow(window.innerWidth * 0.5, 0.85);
    const easedX = (Math.sign(mx) * Math.pow(Math.abs(mx), 0.85)) / k;
    const easedY = my * -0.002;
    const clampedY = Math.max(-0.8, Math.min(0.8, easedY));

    if (!down) {
      const momentumTargetX = easedX + vx * 0.1; // add velocity based momentum
      const momentumTargetY = clampedY + vy * 0.002;

      if (Math.abs(momentumTargetX) > THRESHOLD) {
        const direction = momentumTargetX > 0 ? "yes" : "no";

        // animate the card off-screen
        api.start({
          x: momentumTargetX > 0 ? 6 : -6,
          y: 0, // snap Y back on swipe
          onRest: () => onSwipe(direction),
        });
      } else {
        api.start({ x: 0, y: momentumTargetY });
      }
    } else {
      api.start({ x: easedX, y: clampedY });
    }
  });

  return (
    <animated.mesh position-x={x} position-y={y} {...bind()}>
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
