//추가 요청
export interface IAddReq {
  title: string; // 할 일 제목 (필수!)
  order?: number; // 할 일 순서
}

//수정 요청
export interface IEditReq extends IAddReq {
  id: string; // 할 일 ID
  done: boolean; // 할 일 완료 여부 (필수!)
}

//삭제 요청
export type IDelReq = string;

//조회, 추가, 수정 응답
export interface IRes extends IEditReq {
  createdAt: string; // 할 일 생성일
  updatedAt: string; // 할 일 수정일
}

//삭제 응답
export type IDelRes = true;
