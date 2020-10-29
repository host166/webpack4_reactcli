export function formatSize(size){
  if(size<1024) {
    return size + ' bytes';
  } else if(size<1024*1024) {
    return (size/1024.0).toFixed(0) + ' KB';
  } else if(size<1024*1024*1024) {
    return (size/1024.0/1024.0).toFixed(1) + ' MB';
  } else {
    return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';
  }
}