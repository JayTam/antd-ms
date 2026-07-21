import { MsField, request } from '@jaytam/antd-ms';
import { departmentData, departmentResourceData, resourceGroupData } from './request';

// 资源分组列表
export async function listResourceGroup(data = {}) {
  // return request.post('/portal/resource/web/v2/listResourceGroup', {
  //   ...data,
  // });
  return new Promise((resolve) => {
    const res = {
      data: {
        list: resourceGroupData,
        pageNo: 1,
        pageSize: 100,
        total: 10,
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
}

// root部门
export async function queryRootDepartment(data = {}) {
  // return request.post('/portal/gc-enterprise-ss/web/v1/department/queryRootDepartment', data);
  return new Promise((resolve) => {
    const res = {
      data: {
        id: 12,
        departmentId: 'root',
        departmentName: 'root',
        enterpriseId: 'test123456',
        createdAt: 'May 18, 2023 4:14:57 PM',
        state: 'normal',
        createType: 'manualCreation',
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
}

// 子部门远程请求
export async function queryDepartment(data = {}) {
  // return request.post('/portal/gc-enterprise-ss/web/v1/department/queryChildByDepartmentId', data);
  return new Promise((resolve) => {
    const res = {
      data: departmentData,
    };
    setTimeout(() => resolve(res), 1000);
  });
}

// 通过部门下的资源组信息
export async function queryDepartmentResource(data = {}) {
  // return request.post(
  //   '/portal/gc-enterprise-ss/web/v1/department/queryPageDepartmentResourceGroup',
  //   data,
  // );
  return new Promise((resolve) => {
    const res = {
      data: {
        list: departmentResourceData,
        pageNo: 1,
        pageSize: 100,
        total: 5,
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
}

export default () => {
  return (
    <>
      <MsField
        valueType="resourceGroup"
        fieldProps={{
          defaultSelectFirst: true,
          resourceRequest: listResourceGroup,
          enterpriseCentre: true,
          rootRequest: queryRootDepartment,
          departmentRequest: queryDepartment,
          dResourceRequest: queryDepartmentResource,
        }}
      />
    </>
  );
};
