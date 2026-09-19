"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export function Reveal({ children, delay = 0, className }: Props) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });
	const reduced = useReducedMotion();

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={reduced ? false : { opacity: 0, y: 16 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}
