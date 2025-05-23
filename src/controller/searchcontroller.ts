// import { Request } from "express";

// export const SearchBar = async (req: Request, res: Response) => {
//   const query = req.query.q;
//   if (!query) return res.status(400).json({ message: " Missing search query" });

// try {
//     const results = await Recipe.find({
//     title: { $regex: query, $options: "i" },
//   });
//   res.json(results);
// };
// } catch (error) {
//   res.status(500).json({message: "search failed", error});
// }
