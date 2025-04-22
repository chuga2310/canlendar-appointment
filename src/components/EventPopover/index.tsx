import React, { useEffect, useRef, useState } from "react";
import "./index.css";

type Props = {
	position: { x: number; y: number };
	initialTitle: string;
	onSave: (title: string) => void;
	onClose: () => void;
};

const EventPopover: React.FC<Props> = ({ position, initialTitle, onSave, onClose }) => {
	const [title, setTitle] = useState(initialTitle);
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
				onClose();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	useEffect(() => {
		setTitle(initialTitle);
	}, [initialTitle]);

	return (
		<div ref={popoverRef} className="popover" style={{ top: position.y, left: position.x + 10 }}>
			<input
				autoFocus
				className="popover-input"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter title"
			/>
			<div className="popover-actions">
				<button className="popover-save" onClick={() => onSave(title)}>
					Save
				</button>
				<button className="popover-cancel" onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EventPopover;
