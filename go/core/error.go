package core

type BeverageMixingError struct {
	IsBeverageMixingError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBeverageMixingError(code string, msg string, ctx *Context) *BeverageMixingError {
	return &BeverageMixingError{
		IsBeverageMixingError: true,
		Sdk:              "BeverageMixing",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BeverageMixingError) Error() string {
	return e.Msg
}
