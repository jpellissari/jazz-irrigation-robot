export type ResolvePathResponse = {
  movements: string[];
  finalHeading: string;
};

export interface IResolvePathUseCase {
  execute(): Promise<ResolvePathResponse>;
}
