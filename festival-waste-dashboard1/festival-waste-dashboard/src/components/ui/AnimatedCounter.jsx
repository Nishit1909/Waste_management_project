import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ value, duration = 2, prefix = "", suffix = "" }) {
    const [hasMounted, setHasMounted] = useState(false);
    const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
    const displayValue = useTransform(spring, (current) => {
        return prefix + Math.round(current).toLocaleString() + suffix;
    });

    useEffect(() => {
        setHasMounted(true);
        spring.set(value);
    }, [spring, value]);

    if (!hasMounted) {
        return <span>{prefix}0{suffix}</span>;
    }

    return <motion.span>{displayValue}</motion.span>;
}

export function AnimatedNumber({ value, prefix = "", suffix = "" }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </motion.span>
    );
}
