function MyApplication() {
  function handleDownloadTable(href: string) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.click();
  }
  return <div>MyApplication</div>;
}
export default MyApplication;
