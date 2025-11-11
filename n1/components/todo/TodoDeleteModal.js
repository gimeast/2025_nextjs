"use client";

import { deleteTodo } from "@/actions/todoActions";
import { useActionState, useEffect } from "react";

export default function TodoDeleteModalCP({ tno, onClose, changeShow }) {
  const [deleteState, deleteAction, deletePending] = useActionState(deleteTodo, { result: "" });

  useEffect(() => {
    if (deleteState.result === "success") {
      onClose(); // 부모 컴포넌트의 deleteClose 함수 실행 (라우팅)
      changeShow(false); // 모달을 닫기 위해 부모의 상태 변경
    }
  }, [deleteState.result]); // deleteState.result가 변경될 때마다 이펙트 실행

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 animate-fadeIn"
      onClick={() => changeShow(false)}
    >
      <form action={deleteAction} onClick={(e) => e.stopPropagation()} className="animate-slideUp">
        <input type="hidden" name="tno" defaultValue={tno} />
        <div className="relative p-8 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* 모달 제목 및 설명 */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">할 일 삭제</h3>
            <p className="text-gray-600">
              이 작업은 되돌릴 수 없습니다.
              <br />
              정말로 삭제하시겠습니까?
            </p>
          </div>

          {/* 모달 푸터 (버튼 그룹) */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => changeShow(false)}
              disabled={deletePending}
              className="flex-1 px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
            {deletePending ? (
              <button
                type="button"
                disabled
                className="flex-1 px-6 py-3 bg-red-400 text-white font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                삭제 중...
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
