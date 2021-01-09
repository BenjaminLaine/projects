/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_is.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/03 16:59:25 by blaine            #+#    #+#             */
/*   Updated: 2020/06/16 23:12:47 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

int	ft_is_dir(char *name)
{
	struct stat stat;

	if (name)
	{
		lstat(name, &stat);
		return (S_ISDIR(stat.st_mode));
	}
	return (0);
}

int	ft_is_file_or_dir(char *name)
{
	struct stat stat;

	if (name)
	{
		lstat(name, &stat);
		return (S_ISREG(stat.st_mode) || S_ISDIR(stat.st_mode) ||
				S_ISLNK(stat.st_mode));
	}
	return (0);
}

int	ft_is_file(char *name)
{
	struct stat stat;

	if (name)
	{
		lstat(name, &stat);
		return (S_ISREG(stat.st_mode) || S_ISLNK(stat.st_mode));
	}
	return (0);
}
