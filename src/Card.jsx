import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { Text } from "@react-three/drei";
import { useEffect } from "react";
import { Vector2 } from "three";

export default function Card({ prompt, onSwipe }) {
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 200, friction: 10 },
  }));

  useEffect(() => {
    console.log("Resetting card to zero");
    api.stop();
    api.start({ x: 0, y: 0, immediate: true });
  }, [prompt, api]);

  const THRESHOLD = 1.0;
  const Y_BORDER = 0.6;
  const FLYOFF_DIST = 6;

  const bind = useDrag(({ down, movement: [mx, my], velocity: [vx, vy] }) => {
    const linearX = mx / (window.innerWidth * 0.5);
    const linearY = -(my / (window.innerWidth * 0.5));
    const clampedY = Math.max(-Y_BORDER, Math.min(Y_BORDER, linearY));

    if (!down) {
      const momentumTarget = new Vector2(
        linearX + vx * 0.1,
        clampedY + vy * 0.002,
      );

      if (Math.abs(momentumTarget.x) > THRESHOLD) {
        const answerResult = momentumTarget.x > 0 ? "yes" : "no";

        const flyoffTarget = momentumTarget
          .clone()
          .normalize()
          .multiplyScalar(FLYOFF_DIST);

        // animate the card off-screen
        api.start({
          x: flyoffTarget.x,
          y: flyoffTarget.y, // snap Y back on swipe
          onRest: () => onSwipe(answerResult),
        });
      } else {
        api.start({ x: 0, y: 0 });
      }
    } else {
      api.start({ x: linearX, y: clampedY });
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
        {prompt.text}
      </Text>
    </animated.mesh>
  );
}
