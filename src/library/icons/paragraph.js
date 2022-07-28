const Paragraph = (color = 'midnightblue') => (
  <svg id="Outline" viewBox="0 0 24 24" width="30" height="30">
    <rect y="11" width="24" height="2" rx="1" fill={color} />
    <rect y="4" width="24" height="2" rx="1" fill={color} />
    <rect y="18" width="24" height="2" rx="1" fill={color} />
  </svg>
);

export default Paragraph;
