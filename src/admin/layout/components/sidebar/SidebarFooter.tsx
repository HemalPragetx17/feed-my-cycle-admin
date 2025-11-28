import CollegeImg from '../../../assets/media/college.jpg';

const SidebarFooter = () => {
  return (
    <div
      className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
      id="kt_app_sidebar_footer"
    >
      <div className="text-white d-flex justify-content-between align-items-center">
        <div>
          <img
            src={CollegeImg}
            width={60}
            height={52}
            className="rounded-pill-1 overflow-hidden"
          />
        </div>
        <div className='mt-3'>
          <p className="fs-16 fw-500 p-0 m-0">University of Galway</p>
          <p className="fs-15">School of medicine</p>
        </div>
      </div>
    </div>
  );
};
export { SidebarFooter };
