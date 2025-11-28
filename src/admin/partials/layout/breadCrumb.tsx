import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path: string;
}


const DynamicBreadcrumb: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const relevantSegments = pathSegments.length > 2 ? pathSegments.slice(-2) : pathSegments;
        const breadcrumbItems = relevantSegments.map((segment, index) => {
            const path = '/' + pathSegments.slice(0, index + 1).join('/');
            const label = segment
                .replace(/-/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            return { label, path };
        });
        setBreadcrumbs([{ label: 'Dashboard', path: '/' }, ...breadcrumbItems]);
    }, [location.pathname]);

    // const handleBreadcrumbClick = (index: number) => {
    //     const clickedBreadcrumb = breadcrumbs[index];
    //     const clickedPath = clickedBreadcrumb.path;
    //     if (clickedPath === '/') {
    //         navigate('/');
    //     }
    //     else if (index === breadcrumbs.length - 2) {
    //         const path = location.pathname.split('/').slice(0, -1).join('/');
    //         navigate(path);
    //     }
    // };
    const handleBreadcrumbClick = (index: number) => {
        const clickedBreadcrumb = breadcrumbs[index];
        const clickedPath = clickedBreadcrumb.path;
        if (clickedPath === '/') {
            navigate('/');
        }
        else if (clickedPath.startsWith('/settings')) {
            navigate(`${clickedPath}/contact-us`);
        }
        else if (index === breadcrumbs.length - 2) {
            const path = location.pathname.split('/').slice(0, -1).join('/');
            navigate(path);
        }
        else {
            navigate(clickedPath);
        }
    };

    return (
        <div className="my-3">
            <Breadcrumb>
                {breadcrumbs.map((item, index) => {
                    if (index === breadcrumbs.length - 1) {
                        return (
                            <Breadcrumb.Item
                                key={index}
                                active
                                style={{ cursor: 'default' }}
                            >
                                {item.label}
                            </Breadcrumb.Item>
                        );
                    }
                    return (
                        <Breadcrumb.Item
                            key={index}
                            onClick={() => handleBreadcrumbClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.label}
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div>
    );
};

export default DynamicBreadcrumb;
