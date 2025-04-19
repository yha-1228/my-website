function getCSSVar(property: `--${string}`): string {
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue(property);
}

export { getCSSVar };
